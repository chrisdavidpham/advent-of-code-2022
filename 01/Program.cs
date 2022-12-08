var input = File.ReadAllText("input.txt");
var delimited = input.Replace("\r\n\r\n", ";").Replace("\r\n", ",");
var elves = delimited.Split(";");
int mostCalories = 0;
int secondMostCalories = 0;
int thirdMostCalories = 0;

for (int i = 0; i < elves.Length; i++)
{
    var calories = Array.ConvertAll<string, int>(elves[i].Split(",", StringSplitOptions.RemoveEmptyEntries), int.Parse);
    var sum = calories.Sum();

    if (sum > mostCalories)
    {
        thirdMostCalories = secondMostCalories;
        secondMostCalories = mostCalories;
        mostCalories = sum;
    }
    else if (sum > secondMostCalories)
    {
        thirdMostCalories = secondMostCalories;
        secondMostCalories = sum;
    }
    else if (sum > thirdMostCalories)
    {
        thirdMostCalories = sum;
    }
}

Console.WriteLine(mostCalories);
Console.WriteLine(secondMostCalories);
Console.WriteLine(thirdMostCalories);
Console.WriteLine(mostCalories + secondMostCalories + thirdMostCalories);