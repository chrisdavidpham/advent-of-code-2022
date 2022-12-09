$directory = Split-Path -Parent $PSCommandPath
$rows = [System.Collections.ArrayList]@()
Get-Content $directory\input.txt | ForEach-Object { $rows.Add($_.ToCharArray()) } | Out-Null

$length = $rows[0].Count
$height = $rows.Count

# Count all outer trees
$numVisibleTrees = $length * 2 + $height * 2 - 4

for($x = 1; $x -lt $length - 1; $x++)
{
    for($y = 1; $y -lt $height - 1; $y++)
    {
        $treeHeight = $rows[$y][$x]
        $row = $rows[$y]
        $col = $rows | ForEach-Object { $_[$x] }

        $maxHeightToTheNorth = $col | Select-Object -First $y | Measure-Object -Maximum | Select-Object -ExpandProperty Maximum

        if ([int]$treeHeight -gt $maxHeightToTheNorth)
        {
            $numVisibleTrees++
            continue
        }
        
        $maxHeightToTheEast = $row | Select-Object -Last ($length - 1 - $x) | Measure-Object -Maximum | Select-Object -ExpandProperty Maximum
        if ([int]$treeHeight -gt $maxHeightToTheEast)
        {
            $numVisibleTrees++
            continue
        }

        $maxHeightToTheSouth = $col | Select-Object -Last ($height - 1 - $y) | Measure-Object -Maximum | Select-Object -ExpandProperty Maximum

        if ([int]$treeHeight -gt $maxHeightToTheSouth)
        {
            $numVisibleTrees++
            continue
        }        

        $maxHeightToTheWest = $row | Select-Object -First $x | Measure-Object -Maximum | Select-Object -ExpandProperty Maximum
        if ([int]$treeHeight -gt $maxHeightToTheWest)
        {
            $numVisibleTrees++
            continue
        }
    }
}

Write-Output $numVisibleTrees

$highestViewScore = 0;

for($x = 0; $x -lt $length; $x++)
{
    for($y = 0; $y -lt $height; $y++)
    {
        $treeHeight = $rows[$y][$x]
        $row = $rows[$y]
        $col = $rows | ForEach-Object { $_[$x] }
        $northScore = 0
        $eastScore = 0
        $southScore = 0
        $westScore = 0
        
        # Traverse North
        for ($k = $y - 1; $k -ge 0; $k--)
        {
            $northScore++
            if ($col[$k] -ge $treeHeight)
            {
                break;
            }
        }

        # Traverse East
        for ($j = $x + 1; $j -lt $length; $j++)
        {
            $eastScore++
            if ($row[$j] -ge $treeHeight)
            {
                break;
            }
        }

        # Traverse South
        for ($k = $y + 1; $k -lt $height; $k++)
        {
            $southScore++
            if ($col[$k] -ge $treeHeight)
            {
                break;
            }
        }

        # Traverse East
        for ($j = $x - 1; $j -ge 0; $j--)
        {
            $westScore++
            if ($row[$j] -ge $treeHeight)
            {
                break;
            }
        }

        $score = $northScore * $eastScore * $southScore * $westScore

        if ($score -gt $highestViewScore)
        {
            $highestViewScore = $score
        }
    }
}

Write-Output $highestViewScore