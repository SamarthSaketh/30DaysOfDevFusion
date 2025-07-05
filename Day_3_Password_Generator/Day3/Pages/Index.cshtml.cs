using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Text;

public class IndexModel : PageModel
{
    [BindProperty]
    public int Length { get; set; }

    [BindProperty]
    public int UpperCount { get; set; }

    [BindProperty]
    public int LowerCount { get; set; }

    [BindProperty]
    public int DigitCount { get; set; }

    [BindProperty]
    public int SymbolCount { get; set; }

    public string GeneratedPassword { get; set; }

    public void OnPost()
    {
        int total = UpperCount + LowerCount + DigitCount + SymbolCount;

        if (total != Length)
        {
            GeneratedPassword = $"⚠️ Total of all character types ({total}) must equal password length ({Length}).";
            return;
        }

        GeneratedPassword = GeneratePassword(UpperCount, LowerCount, DigitCount, SymbolCount);
    }

    private string GeneratePassword(int upper, int lower, int digits, int symbols)
    {
        string upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        string lowerChars = "abcdefghijklmnopqrstuvwxyz";
        string digitChars = "0123456789";
        string symbolChars = "!@#$%^&*";

        StringBuilder password = new StringBuilder();
        Random rand = new Random();

        void AppendRandomChars(string source, int count)
        {
            for (int i = 0; i < count; i++)
            {
                password.Append(source[rand.Next(source.Length)]);
            }
        }

        AppendRandomChars(upperChars, upper);
        AppendRandomChars(lowerChars, lower);
        AppendRandomChars(digitChars, digits);
        AppendRandomChars(symbolChars, symbols);

        // Shuffle the final password
        return new string(password.ToString().OrderBy(_ => rand.Next()).ToArray());
    }
}
