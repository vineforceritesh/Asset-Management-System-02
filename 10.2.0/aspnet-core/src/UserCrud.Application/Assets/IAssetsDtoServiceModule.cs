using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.Assets.Dto;

namespace UserCrud.Assets
{
    public interface IAssetsDtoServiceModule
    {
        Task<AssetsDto> GetByIdAsync(int id);
        Task<List<AssetsDto>> GetAllAsync();
        Task<AssetsDto> CreateAsync(CreateDto input);

        Task<AssetsDto> UpdateAsync(UpdateDto input);
        Task DeleteAsync(int id);

    }
}
