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

    public static generateGUID()
    {
        function S4()
        {
            return Math.floor((1 + Math.random()) * 0x10000)
                       .toString(16)
                       .substring(1);
        }

        return S4() + S4();
    }

    public static handleize(text)
    {
        return text.toString().toLowerCase()
                   .replace(/\s+/g, '-')           // Replace spaces with -
                   .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
                   .replace(/\-\-+/g, '-')         // Replace multiple - with single -
                   .replace(/^-+/, '')             // Trim - from start of text
                   .replace(/-+$/, '');            // Trim - from end of text
    }
}
