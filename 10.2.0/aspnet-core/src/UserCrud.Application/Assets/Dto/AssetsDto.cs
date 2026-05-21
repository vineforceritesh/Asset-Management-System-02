using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.Assets.assetsEnum;

namespace UserCrud.Assets.Dto
{
    public class AssetsDto
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Type { get; set; }

        [Required]
        public string SerialNumber { get; set; }

        [Required]
        public DateTime PurchaseDate { get; set; }

        [Required]
        public AssetEnum Status { get; set; }

        [Required]
        public DateTime CreatedDate { get; set; }

    }
}
