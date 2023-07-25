using CompanyDetails.AppCode;

namespace CompanyDetails.Models
{
    public class LayoutViewModel
    {
        public required string SiteUrlClear { get; set; }
        public required string SiteUrl { get; set; }
        /// <summary>
        /// Скрыть шапку (в layout.cshtml)
        /// </summary>
        public bool HideHead { get; set; }

        public required string TextOk { get; set; }


        public static LayoutViewModel GetLayoutViewModel()
        {
            var result = new LayoutViewModel()
            {               
                SiteUrlClear = C.SiteUrlClear,
                SiteUrl = C.SiteUrl,
                TextOk = C.TextOk
            };
            return result;

        }
    }
}