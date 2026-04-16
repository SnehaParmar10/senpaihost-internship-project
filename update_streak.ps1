Write-Host "Building 99+ day streak (consecutive days activity)..."
git config user.name "Sneha"
git config user.email "sneha@example.com"
$n = 105
$endDate = Get-Date "2026-04-16"
$startDate = $endDate.AddDays(-$n)

for ($i = 0; $i -le $n; $i++) {
    $currentDate = $startDate.AddDays($i)
    $hour = Get-Random -Min 9 -Max 21
    $min = Get-Random -Min 0 -Max 59
    $dateStr = $currentDate.ToString("yyyy-MM-dd") + "T" + $hour.ToString("00") + ":" + $min.ToString("00") + ":00"
    
    $env:GIT_AUTHOR_DATE = $dateStr
    $env:GIT_COMMITTER_DATE = $dateStr
    
    Add-Content -Path ".streak_record" -Value $dateStr
    git add .streak_record
    git commit -m "chore: streak maintenance update ($dateStr)" --quiet
}

Write-Host "Final step: Pushing to GitHub..."
git push origin main --quiet
Write-Host "Success! Max Streak should now reflect 99+ days."
