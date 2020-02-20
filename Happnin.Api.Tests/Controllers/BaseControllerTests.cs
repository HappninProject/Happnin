using System;
using AutoMapper;
using Happnin.Api.Controllers;
using Happnin.Business;
using Happnin.Business.Dto;
using Happnin.Business.Services;
using Moq;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace Happnin.Api.Tests.Controllers
{
    public abstract class BaseControllerTests<TService, TDto, TInputDto>
        where TService : class, IEntityService<TDto, TInputDto>
        where TInputDto : class
        where TDto : class, TInputDto, IEntity
    {
        public abstract TDto CreateDto();
        public abstract BaseController<TDto,TInputDto> GetController(TService service);
        protected IMapper Mapper { get; } = AutomapperProfileConfiguration.CreateMapper();
        protected BaseControllerTests()
        {
        }

        [Fact]
        public void Controller_PassedNullService_ThrowsNullArgException()
        {
            Action act = () => GetController(null);

            Assert.Throws<ArgumentNullException>(act);
        }

        [Fact]
        public async Task Get_FetchesAllItems()
        {
            var service = new Mock<TService>();
            var expectedValues = new List<TDto>
            {
                CreateDto(),
                CreateDto(),
                CreateDto()
            };
            service.Setup(service => service.FetchAllAsync())
                .Returns(Task.FromResult(expectedValues));
            BaseController<TDto, TInputDto> controller = GetController(service.Object);

            var items = await controller.Get();

            Assert.Equal(expectedValues.ToList(), items.ToList());
        }

        [Fact]
        public async Task Get_WithValidId_200Ok()
        {
            Mock<TService> service = new Mock<TService>();
            TDto entity = CreateDto();
            service.Setup(service => service.FetchByIdAsync(42))
                .Returns(Task.FromResult(entity));
            BaseController<TDto, TInputDto> controller = GetController(service.Object);

            IActionResult result = await controller.Get(42);

            Assert.True(result is OkObjectResult);
            OkObjectResult ok = (OkObjectResult) result;
            Assert.Equal(entity, ok.Value);
        }

        [Fact]
        public async Task Get_WithoutValidId_NotFound()
        {
            Mock<TService> service = new Mock<TService>();
            service.Setup(service => service.FetchByIdAsync(42))
                .Returns(Task.FromResult<TDto>(null));
            BaseController<TDto, TInputDto> controller = GetController(service.Object);

            IActionResult result = await controller.Get(42);

            Assert.True(result is NotFoundResult);
        }

        [Fact]
        public async Task Put_UpdatesItem()
        {
            TDto dto = CreateDto();
            TDto UpdateDto = CreateDto();
            TInputDto entityInput = Mapper.Map<TDto, TInputDto>(UpdateDto);
            Mock<TService> service = new Mock<TService>();
            service.Setup(service => service.UpdateAsync(dto.Id, entityInput))
                .Returns(Task.FromResult(UpdateDto));
            BaseController<TDto, TInputDto> controller = GetController(service.Object);

            ActionResult<TDto> result = await controller.Put(dto.Id, entityInput);

            Assert.True(result.Result is OkObjectResult);
            OkObjectResult ok = (OkObjectResult) result.Result;
            Assert.Equal(UpdateDto, ok.Value);
        }

        [Fact]
        public virtual async Task Post_ValidItem_Inserted()
        {
            TDto dto = CreateDto();
            TInputDto entityInput = Mapper.Map<TDto, TInputDto>(dto);
            Mock<TService> service = new Mock<TService>();
            service.Setup(service => service.InsertAsync(entityInput))
                .Returns(Task.FromResult(dto));
            BaseController<TDto, TInputDto> controller = GetController(service.Object);
            
            TDto result = await controller.Post(entityInput);

            Assert.Equal(dto, result);
        }

        [Fact]
        public async Task Delete_WhenItemExist_ReturnOk()
        {
            var service = new Mock<TService>();
            service.Setup(service => service.DeleteAsync(42))
                .Returns(Task.FromResult(true));
            var controller = GetController(service.Object);

            IActionResult result = await controller.Delete(42);

            Assert.True(result is OkResult);
        }

        [Fact]
        public async Task Delete_WhenNoItemExist_ReturnNotFound()
        {
            var service = new Mock<TService>();
            var controller = GetController(service.Object);

            IActionResult result = await controller.Delete(42);

            Assert.True(result is NotFoundResult);
        }

    }
}
