# tools/sync-nstc.ps1 — 抓取國科會研究人才網著作/計畫，輸出 data/nstc.json
# 用法：powershell tools/sync-nstc.ps1  （或 pwsh，GitHub Actions 亦用此腳本）
# 結束碼：0=成功或無變動；1=抓取/解析失敗（不寫檔，網站維持原狀）
param(
  [string]$OutFile = (Join-Path (Split-Path -Parent $PSScriptRoot) "data/nstc.json")
)
$ErrorActionPreference = "Stop"
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$RS_NO = "d224e67d09bd45b9b822380b65c26085"
$BASE  = "https://arspb.nstc.gov.tw/NSCWebFront/modules/talentSearch/talentSearch.do"

function Get-Page([string]$Url) {
  $resp = Invoke-WebRequest -Uri $Url -UseBasicParsing -UserAgent "Mozilla/5.0"
  # 一律以 UTF-8 解碼原始位元組，避免 PS5.1 依 header 誤判編碼
  $bytes = $resp.RawContentStream.ToArray()
  return [Text.Encoding]::UTF8.GetString($bytes)
}

function Get-CellText([string]$CellHtml) {
  $text = $CellHtml -replace '(?s)<[^>]+>', ' '
  $text = [Net.WebUtility]::HtmlDecode($text)
  return ($text -replace '\s+', ' ').Trim()
}

function Get-DataRows([string]$Html) {
  # 資料表 = 不帶屬性的 <table>，第一列是 <th> 表頭
  $table = [regex]::Match($Html, '(?s)<table>\s*<tr>\s*<th.*?</table>')
  if (-not $table.Success) { return @() }
  $rows = @()
  foreach ($tr in [regex]::Matches($table.Value, '(?s)<tr>(.*?)</tr>')) {
    if ($tr.Value -match '<th') { continue }
    $cells = @()
    foreach ($td in [regex]::Matches($tr.Groups[1].Value, '(?s)<td[^>]*>(.*?)</td>')) {
      $cells += Get-CellText $td.Groups[1].Value
    }
    if ($cells.Count -gt 0) { $rows += , $cells }
  }
  return , $rows
}

try {
  $pubHtml  = Get-Page "$BASE`?action=initRsm05&rsNo=$RS_NO&LANG=chi"
  $projHtml = Get-Page "$BASE`?action=initRsm17new&rsNo=$RS_NO&LANG=chi"
} catch {
  Write-Host "抓取失敗：$($_.Exception.Message)"
  exit 1
}

$publications = @()
foreach ($cells in (Get-DataRows $pubHtml)) {
  if ($cells.Count -lt 5) { continue }
  $publications += [ordered]@{
    date = $cells[0]; type = $cells[1]; title = $cells[2]; authors = $cells[3]; venue = $cells[4]
  }
}

$projects = @()
foreach ($cells in (Get-DataRows $projHtml)) {
  if ($cells.Count -lt 6) { continue }
  $projects += [ordered]@{
    year = $cells[0]; category = $cells[1]; field = $cells[2]
    title = $cells[3]; role = $cells[4]; budget = $cells[5]
  }
}

if ($publications.Count -eq 0 -or $projects.Count -eq 0) {
  Write-Host "解析 0 筆（著作 $($publications.Count)、計畫 $($projects.Count)），可能國科會改版，不更新。"
  exit 1
}

# 內容無變動就不寫檔（避免每週無意義 commit；lastSync 不列入比較）
$coreNew = [ordered]@{ publications = $publications; projects = $projects } | ConvertTo-Json -Depth 5
if (Test-Path $OutFile) {
  try {
    $old = Get-Content $OutFile -Raw -Encoding UTF8 | ConvertFrom-Json
    $coreOld = [ordered]@{ publications = $old.publications; projects = $old.projects } | ConvertTo-Json -Depth 5
    if ($coreOld -eq $coreNew) { Write-Host "資料無變動，不更新。"; exit 0 }
  } catch { }
}

$payload = [ordered]@{
  lastSync     = (Get-Date -Format "yyyy-MM-dd")
  publications = $publications
  projects     = $projects
} | ConvertTo-Json -Depth 5
New-Item -ItemType Directory -Force (Split-Path -Parent $OutFile) | Out-Null
[IO.File]::WriteAllText($OutFile, $payload, (New-Object Text.UTF8Encoding($false)))
Write-Host "已更新 $OutFile（著作 $($publications.Count) 筆、計畫 $($projects.Count) 筆）"
