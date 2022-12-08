using (StreamReader stream = new StreamReader("input.txt"))
{
    var totalScore1 = 0;
    var totalScore2 = 0;
    string? line = stream.ReadLine();

    while (!string.IsNullOrEmpty(line))
    {
        switch (line)
        {
            case "A X":
                totalScore1 += 3;
                totalScore1 += 1;
                break;
            case "A Y":
                totalScore1 += 6;
                totalScore1 += 2;
                break;
            case "A Z":
                totalScore1 += 3;
                break;
            case "B X":
                totalScore1 += 1;
                break;
            case "B Y":
                totalScore1 += 3;
                totalScore1 += 2;
                break;
            case "B Z":
                totalScore1 += 6;
                totalScore1 += 3;
                break;
            case "C X":
                totalScore1 += 6;
                totalScore1 += 1;
                break;
            case "C Y":
                totalScore1 += 2;
                break;
            case "C Z":
                totalScore1 += 3;
                totalScore1 += 3;
                break;
            default:
                throw new Exception($"invalid case: {line}");
        }

        switch (line)
        {
            case "A X":
                totalScore2 += 3;
                break;
            case "A Y":
                totalScore2 += 3;
                totalScore2 += 1;
                break;
            case "A Z":
                totalScore2 += 6;
                totalScore2 += 2;
                break;
            case "B X":
                totalScore2 += 1;
                break;
            case "B Y":
                totalScore2 += 3;
                totalScore2 += 2;
                break;
            case "B Z":
                totalScore2 += 6;
                totalScore2 += 3;
                break;
            case "C X":
                totalScore2 += 2;
                break;
            case "C Y":
                totalScore2 += 3;
                totalScore2 += 3;
                break;
            case "C Z":
                totalScore2 += 6;
                totalScore2 += 1;
                break;
            default:
                throw new Exception($"invalid case: {line}");
        }

        line = stream.ReadLine();
    }

    Console.WriteLine(totalScore1.ToString());
    Console.WriteLine(totalScore2.ToString());
}