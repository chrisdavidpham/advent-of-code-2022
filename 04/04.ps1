$directory = Split-Path -Parent $PSCommandPath

$stream = New-Object -TypeName System.IO.StreamReader -ArgumentList $directory\input.txt

try
{
    $answer1 = 0
    $answer2 = 0

    foreach ($line in $content)
    {
        $assignments = $line.Split(",")

        $assignments1 = $assignments[0]
        $assignments2 = $assignments[1]

        [int]$min1 = $assignments1.Split("-")[0]
        [int]$max1 = $assignments1.Split("-")[1]

        [int]$min2 = $assignments2.Split("-")[0]
        [int]$max2 = $assignments2.Split("-")[1]


        if ($min1 -le $min2 -and $max1 -ge $max2)
        {
            $answer1++
        }
        elseif ($min2 -le $min1 -and $max2 -ge $max1)
        {
            $answer1++
        }

        if ($max1 -ge $min2 -and $max1 -le $max2)
        {
            $answer2++
        }
        elseif ($max2 -ge $min1 -and $max2 -le $max1)
        {
            $answer2++
        }
    }

    Write-Output $answer1
    Write-Output $answer2
}
finally
{
    $stream.Close()
    $stream.Dispose()
}