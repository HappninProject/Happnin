using Happnin.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Happnin.Business.Dto;
using Happnin.Business.Services;
using Xunit;

namespace Happnin.Business.Tests
{
    public abstract class EntityServiceBaseTest<TDto, TInputDto, TEntity> : BaseTests 
        where TEntity : class, IEntityBase
        where TInputDto : class
        where TDto : class, TInputDto, IEntity
    {
        public abstract (TEntity entity, TEntity secondEntity) GetEntities();

        public abstract (TDto dto, TDto seconDto) GetDtos(); 

        public abstract EntityService<TDto, TInputDto, TEntity> GetService(AppDbContext dbContext);

        public abstract void AssertEntitiesAreEqual(TEntity expected, TEntity actual);

        public abstract void AssertDtosAreEqual(TDto expected, TDto actual);

        public abstract TEntity UpdateEntity(TEntity entity, string update);

        [Fact]
        public virtual async Task InsertAsync_TwoEntities_Success()
        {
            using AppDbContext dbContext = new AppDbContext(Options);
            EntityService<TDto, TInputDto, TEntity> service = GetService(dbContext);
            (TDto entity, TDto secondEntity) = GetDtos();
            
            TDto insertedEntity = await service.InsertAsync(entity);
            TDto insertedSecondEntity = await service.InsertAsync(secondEntity);


            Assert.NotEqual(0, insertedEntity.Id);
            Assert.NotEqual(0, insertedSecondEntity.Id);
        }

        [Fact]
        virtual public async Task Update_EntityUpdated_ShouldSaveToDatabase()
        {
            using AppDbContext dbContext = new AppDbContext(Options);
            EntityService<TDto, TInputDto, TEntity> service = GetService(dbContext);
            (TEntity entity, TEntity secondEntity) = GetEntities();


            await dbContext.Set<TEntity>().AddAsync(entity);
            await dbContext.Set<TEntity>().AddAsync(secondEntity);
            await dbContext.SaveChangesAsync();
            
            using AppDbContext dbContextFetch = new AppDbContext(Options);
            TEntity updateEntityFromDb = await dbContextFetch.Set<TEntity>().SingleOrDefaultAsync(e => e.Id == entity.Id);
            updateEntityFromDb = UpdateEntity(updateEntityFromDb, "This was updated");
            TInputDto inputDto = Mapper.Map<TEntity, TDto>(updateEntityFromDb);


            await service.UpdateAsync(secondEntity.Id, inputDto);

            using AppDbContext dbContextAssert = new AppDbContext(Options);
            TEntity entityFromDb = await dbContextAssert.Set<TEntity>().SingleOrDefaultAsync(e => e.Id == entity.Id);
            TEntity secondEntityFromDb = await dbContextAssert.Set<TEntity>().SingleOrDefaultAsync(e => e.Id == secondEntity.Id);

            AssertEntitiesAreEqual(entity, entityFromDb);
            AssertEntitiesAreEqual(updateEntityFromDb, secondEntityFromDb);
        }

        [Fact]
        public async Task Delete_OneEntity_RemovesOnlyOne()
        {
            using AppDbContext dbContext = new AppDbContext(Options);
            EntityService<TDto, TInputDto, TEntity> service = GetService(dbContext);
            (TEntity entity, TEntity secondEntity) = GetEntities();

            await dbContext.Set<TEntity>().AddAsync(entity);
            await dbContext.Set<TEntity>().AddAsync(secondEntity);
            await dbContext.SaveChangesAsync();
            
            bool deleted = await service.DeleteAsync(entity.Id);
            using AppDbContext dbContextAssert = new AppDbContext(Options);
            TEntity entityFromDb =  await dbContextAssert.Set<TEntity>().SingleOrDefaultAsync(e => e.Id == entity.Id);
            TEntity secondEntityFromDb = await dbContextAssert.Set<TEntity>().SingleOrDefaultAsync(e => e.Id == secondEntity.Id);

            Assert.True(deleted);
            Assert.Null(entityFromDb);
            AssertEntitiesAreEqual(secondEntity, secondEntityFromDb);
        }

        [Fact]
        public async Task Delete_IdNotFound_ReturnsFalse()
        {
            using AppDbContext dbContext = new AppDbContext(Options);
            EntityService<TDto, TInputDto, TEntity> service = GetService(dbContext);

            bool deleted = await service.DeleteAsync(42);

            Assert.False(deleted);
        }

        [Fact]
        virtual public async Task FetchAll_RetrievesAllEntities_Success()
        {
            using AppDbContext dbContext = new AppDbContext(Options);
            EntityService<TDto, TInputDto, TEntity> service = GetService(dbContext);
            (TEntity entity, TEntity secondEntity) = GetEntities();

            await dbContext.Set<TEntity>().AddAsync(entity);
            await dbContext.Set<TEntity>().AddAsync(secondEntity);
            await dbContext.SaveChangesAsync();

            List<TDto> entities = await service.FetchAllAsync();

            TDto entityFromDb = entities[0];
            TDto secondEntityFromDb = entities[1];

            TDto entityDto = Mapper.Map<TEntity, TDto>(entity);
            TDto secondEntityDto = Mapper.Map<TEntity, TDto>(secondEntity);
            AssertDtosAreEqual(entityDto, entityFromDb);
            AssertDtosAreEqual(secondEntityDto, secondEntityFromDb);
        }

        [Fact]
        public async Task FetchAll_EmptyDataBase_ReturnsEmpty()
        {
            using AppDbContext dbContext = new AppDbContext(Options);
            EntityService<TDto, TInputDto, TEntity> service = GetService(dbContext);

            List<TDto> entities = await service.FetchAllAsync();

            Assert.Empty(entities);
        }

        [Fact]
        virtual public async Task Fetch_RetrievesOneEntity_Success()
        {
            using AppDbContext dbContext = new AppDbContext(Options);
            EntityService<TDto, TInputDto, TEntity> service = GetService(dbContext);
            (TEntity entity, TEntity secondEntity) = GetEntities();

            await dbContext.Set<TEntity>().AddAsync(entity);
            await dbContext.Set<TEntity>().AddAsync(secondEntity);
            await dbContext.SaveChangesAsync();

            TDto entityFromDb = await service.FetchByIdAsync(entity.Id!);
            TDto entityDto = Mapper.Map<TEntity, TDto>(entity);
            
            AssertDtosAreEqual(entityDto, entityFromDb);
        }

        [Fact]
        public async Task Fetch_IdNotFound_ReturnNulls()
        {
            using AppDbContext dbContext = new AppDbContext(Options);
            EntityService<TDto, TInputDto, TEntity> service = GetService(dbContext);

            TDto entity = await service.FetchByIdAsync(42);

            Assert.Null(entity);
        }
    }
}