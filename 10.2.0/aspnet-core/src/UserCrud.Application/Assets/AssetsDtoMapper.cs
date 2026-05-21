using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserCrud.Assets.Dto;

namespace UserCrud.Assets
{
    public class AssetsDtoMapper:Profile
    {
        public AssetsDtoMapper()
        {
            CreateMap<Asset, AssetsDto>();
            CreateMap<CreateDto, Asset>();
            CreateMap<UpdateDto, Asset>();
        }
    }
}
