namespace c_assessment
{
    public class Shirt { 
        public string Color { get; private set; } //i'll force u to use the constructor
        public string Pattern { get; private set; }
        public Shirt() { }
        public Shirt(string color, string pattern) {
            Color = color;
            Pattern = pattern;
        }
        public override string ToString() {
            return $"{Color}:{Pattern}";
        }
    }
    internal class Program
    {
        static void Main(string[] args)
            {
            List<Shirt> myShirts = new List<Shirt>() { };
            List <string> colors = new List<string>() { "Red", "Green", "Blue" };
            List <string> patterns = new List<string>() { "Striped", "Checked", "Plain" };
            foreach (string c in colors) {
                foreach (string p in patterns) {
                   Shirt myShirt = new Shirt(c, p);
                   myShirts.Add(myShirt);
                }
            }
            foreach (Shirt s in myShirts) {
                Console.WriteLine(s);
            }
        }
    }
}
