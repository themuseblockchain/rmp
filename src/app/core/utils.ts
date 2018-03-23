export class Utils
{
    public static generateKey()
    {
        function S4()
        {
            return Math.floor((1 + Math.random()) * 0x1000)
                       .toString(16)
                       .substring(1);
        }
        return S4() + S4() + S4() + S4() + S4();
    }
}
