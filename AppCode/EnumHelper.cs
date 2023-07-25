namespace CompanyDetails.AppCode
{
    public static class EnumHelper
    {
        public static string EnumToString(this Enum eff)
        {
            return eff.ToString();
        }

        public static EnumType StringToEnum<EnumType>(this string enumValue)
        {
            return (EnumType)Enum.Parse(typeof(EnumType), enumValue);
        }

    }
}
