using (StreamReader stream = new StreamReader("input.txt"))
{
    var sumPriorities1 = 0;
    string ruckSack = stream.ReadLine() ?? string.Empty;

    while (!string.IsNullOrEmpty(ruckSack))
    {
        var compartmentOne = ruckSack.Substring(0, ruckSack.Length / 2);
        var compartmentTwo = ruckSack.Substring(ruckSack.Length / 2, ruckSack.Length / 2);

        foreach (char item in compartmentOne.ToCharArray().Distinct())
        {
            if (compartmentTwo.Contains(item))
            {
                if (Char.IsUpper(item))
                {
                    // convert ASCII to priority value
                    int priority = (int)item - 64 + 26;
                    sumPriorities1 += priority;
                }
                else
                {
                    int priority = (int)item - 96;
                    sumPriorities1 += priority;
                }
            }
        }

        ruckSack = stream.ReadLine() ?? string.Empty;
    }
    
    Console.WriteLine(sumPriorities1);

    // Part 2
    stream.BaseStream.Position = 0;
    var sumPriorities2 = 0;
    ruckSack = stream.ReadLine() ?? string.Empty;

    while (!string.IsNullOrEmpty(ruckSack))
    {
        string ruckSackTwo = stream.ReadLine() ?? string.Empty;
        string ruckSackThree = stream.ReadLine() ?? string.Empty;

        foreach (char item in ruckSack.ToCharArray().Distinct())
        {
            if (ruckSackTwo.Contains(item) && ruckSackThree.Contains(item))
            {
                if (Char.IsUpper(item))
                {
                    int priority = (int)item - 64 + 26;
                    sumPriorities2 += priority;
                }
                else
                {
                    int priority = (int)item - 96;
                    sumPriorities2 += priority;
                }
            }
        }

        ruckSack = stream.ReadLine() ?? string.Empty;
    }

    Console.WriteLine(sumPriorities2);
}
