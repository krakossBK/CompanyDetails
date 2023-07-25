namespace CompanyDetails.AppCode
{
    public class C /*C - Сокращение от Constants, чтобы меньше места в коде занимало и было нагляднее*/
    {
        //  Для возможности запуска приложения без config.json изменим параметр optional на true,
        //  который в данном случае означает, что наличие config.json является необязательным.

        // .AddJsonFile — добавляет JSON файл, reloadOnChange:true указывает на то,
        // что при изменение параметров файла конфигурации, они будут перезагружены без необходимости перезагружать приложение.


        private const string Path = "config.json";
        #pragma warning disable CS8601 // Возможно, назначение-ссылка, допускающее значение NULL.
        public static string LocalHost = new ConfigurationBuilder().AddJsonFile(Path, optional: true, reloadOnChange: true).Build()["localhost"];
        public static string Production = new ConfigurationBuilder().AddJsonFile(Path, optional: true, reloadOnChange: true).Build()["production"];
        public static string WebAddress = new ConfigurationBuilder().AddJsonFile(Path, optional: true, reloadOnChange: true).Build()["webaddress"];
        #pragma warning restore CS8601 // Возможно, назначение-ссылка, допускающее значение NULL.

        public static string SiteUrlClear => Production == "true" ? WebAddress : "https://localhost:" + LocalHost;
        public static string SiteUrl => SiteUrlClear + "/";

        /// <summary>
        /// email website developer <br />
        /// krakoss@bk.ru
        /// </summary>
        public static string MiddleWebSiteDeveloperEmail => "krakoss@bk.ru";


        /// <summary>
        /// Текст добавляемого сообщения при удачной проверке на условия <br />
        /// TextOk => "ok";
        /// </summary>
        public static string TextOk => "ok";
        /// <summary>
        /// Текст добавляемого сообщения при ошибке <br />
        /// TextErrors => "error";
        /// </summary>
        public static string TextErrors => "error"; 
    }
}
