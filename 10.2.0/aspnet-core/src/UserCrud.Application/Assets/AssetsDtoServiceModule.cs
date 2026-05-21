using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using UserCrud.Assets.Dto;

namespace UserCrud.Assets
{
    public class AssetsDtoServiceModule : ApplicationService, IAssetsDtoServiceModule
    {
        private readonly IRepository<Asset, int> _assetRepository;

        public AssetsDtoServiceModule(IRepository<Asset, int> assetRepository)
        {
            _assetRepository = assetRepository;
        }

        public async Task<List<AssetsDto>> GetAllAsync()
        {
            var assets = await _assetRepository.GetAllListAsync();

            return ObjectMapper.Map<List<AssetsDto>>(assets);
        }

        public async Task<AssetsDto> GetByIdAsync(int id)
        {
            var asset = await _assetRepository.GetAsync(id);

            return ObjectMapper.Map<AssetsDto>(asset);
        }

        public async Task<AssetsDto> CreateAsync(CreateDto input)
        {
            // Validation for duplicate serial number
            if (await _assetRepository.GetAll()
                .AnyAsync(x => x.SerialNumber == input.SerialNumber))
            {
                throw new UserFriendlyException("Serial Number already exists");
            }

            var asset = ObjectMapper.Map<Asset>(input);

            await _assetRepository.InsertAsync(asset);

            return ObjectMapper.Map<AssetsDto>(asset);
        }

        public async Task<AssetsDto> UpdateAsync(UpdateDto input)
        {
            // Validation for duplicate serial number
            if (await _assetRepository.GetAll()
                .AnyAsync(x => x.SerialNumber == input.SerialNumber && x.Id != input.Id))
            {
                throw new UserFriendlyException("Serial Number already exists");
            }

            var asset = await _assetRepository.GetAsync(input.Id);

            ObjectMapper.Map(input, asset);

            await _assetRepository.UpdateAsync(asset);

            return ObjectMapper.Map<AssetsDto>(asset);
        }

        public async Task DeleteAsync(int id)
        {
            await _assetRepository.DeleteAsync(id);
        }
    }
}