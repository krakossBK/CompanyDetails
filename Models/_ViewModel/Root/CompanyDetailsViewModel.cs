namespace CompanyDetails.Models
{
    public class CompanyDetailsViewModel
    {
        public required Company Company { get; set; }

        public required List<Employee> Employees { get; set; }
    }
}
