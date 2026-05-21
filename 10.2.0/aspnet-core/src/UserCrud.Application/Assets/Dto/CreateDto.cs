using System;
using System.ComponentModel.DataAnnotations;
using UserCrud.Assets.assetsEnum;

namespace UserCrud.Assets.Dto
{
    public class CreateDto
    {
        [Required(ErrorMessage = "Asset name is required")]
        [StringLength(100, ErrorMessage = "Asset name cannot exceed 100 characters")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Asset type is required")]
        [StringLength(50, ErrorMessage = "Asset type cannot exceed 50 characters")]
        public string Type { get; set; }

        [Required(ErrorMessage = "Serial number is required")]
        [StringLength(100, ErrorMessage = "Serial number cannot exceed 100 characters")]
        public string SerialNumber { get; set; }

        [Required(ErrorMessage = "Purchase date is required")]
        [DataType(DataType.Date)]
        public DateTime PurchaseDate { get; set; }

        [Required(ErrorMessage = "Status is required")]
        [EnumDataType(typeof(AssetEnum), ErrorMessage = "Invalid asset status")]
        public AssetEnum Status { get; set; }

        [Required(ErrorMessage = "Created date is required")]
        [DataType(DataType.Date)]
        public DateTime CreatedDate { get; set; }
    }
}