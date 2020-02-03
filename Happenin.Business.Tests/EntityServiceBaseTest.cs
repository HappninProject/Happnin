using System.Collections.Generic;
using System.Threading.Tasks;
using Happenin.Business.Tests;
using Microsoft.EntityFrameworkCore;
using Happnin.Data;
using SecretSanta.Business;
using Xunit;

namespace Happnin.Business.Tests
{
    public abstract class EntityServiceBaseTest<TEntity> : BaseTests where TEntity : EntityBase
    {
        public abstract (TEntity entity, TEntity secondEntity) GetEntities();

        public abstract EntityService<TEntity> GetService(AppDbContext dbContext);

        public abstract void AssertEntitiesAreEqual(TEntity expected, TEntity actual);

        public abstract TEntity UpdateEntity(TEntity entity, string update);

        [Fact]
        public async Task InsertAsync_TwoEntities_Success()
        {
            using var dbContext = new AppDbContext(Options);
            EntityService<TEntity> service = GetService(dbContext);
            (TEntity entity, TEntity secondEntity) = GetEntities();

            await service.InsertAsync(entity);
            await service.InsertAsync(secondEntity);

            Assert.NotNull(entity.Id);
            Assert.NotNull(secondEntity.Id);
        }

        [Fact]
        virtual public async Task Update_EntityUpdated_ShouldSaveToDatabase()
        {
            using var dbContext = new AppDbContext(Options);
            EntityService<TEntity> service = GetService(dbContext);
            (TEntity entity, TEntity secondEntity) = GetEntities();

            await dbContext.Set<TEntity>().AddAsync(entity);
            await dbContext.Set<TEntity>().AddAsync(secondEntity);
            await dbContext.SaveChangesAsync();
            
            using var dbContextFetch = new AppDbContext(Options);
            TEntity updateEntityFromDb = await dbContextFetch.Set<TEntity>().SingleOrDefaultAsync(e => e.Id == entity.Id);

            updateEntityFromDb = UpdateEntity(updateEntityFromDb, "This was updated");

            await service.UpdateAsync(secondEntity.Id!.Value, updateEntityFromDb);

            using var dbContextAssert = new AppDbContext(Options);
            TEntity entityFromDb = await dbContextAssert.Set<TEntity>().SingleOrDefaultAsync(e => e.Id == entity.Id);
            TEntity secondEntityFromDb = await dbContextAssert.Set<TEntity>().SingleOrDefaultAsync(e => e.Id == secondEntity.Id);

            AssertEntitiesAreEqual(entity, entityFromDb);
            AssertEntitiesAreEqual(updateEntityFromDb, secondEntityFromDb);
        }

        [Fact]
        public async Task Delete_OneEntity_RemovesOnlyOne()
        {
            using var dbContext = new AppDbContext(Options);
            EntityService<TEntity> service = GetService(dbContext);
            (TEntity entity, TEntity secondEntity) = GetEntities();

            await dbContext.Set<TEntity>().AddAsync(entity);
            await dbContext.Set<TEntity>().AddAsync(secondEntity);
            await dbContext.SaveChangesAsync();
            
            bool deleted = await service.DeleteAsync(entity.Id!.Value);
            using var dbContextAssert = new AppDbContext(Options);
            TEntity entityFromDb =  await dbContextAssert.Set<TEntity>().SingleOrDefaultAsync(e => e.Id == entity.Id);
            TEntity secondEntityFromDb = await dbContextAssert.Set<TEntity>().SingleOrDefaultAsync(e => e.Id == secondEntity.Id);

            Assert.True(deleted);
            Assert.Null(entityFromDb);
            AssertEntitiesAreEqual(secondEntity, secondEntityFromDb);
        }

        [Fact]
        public async Task Delete_IdNotFound_ReturnsFalse()
        {
            using var dbContext = new AppDbContext(Options);
            EntityService<TEntity> service = GetService(dbContext);

            bool deleted = await service.DeleteAsync(42);

            Assert.False(deleted);
        }

        [Fact]
        virtual public async Task FetchAll_RetrievesAllEntities_Success()
        {
            using var dbContext = new AppDbContext(Options);
            EntityService<TEntity> service = GetService(dbContext);
            (TEntity entity, TEntity secondEntity) = GetEntities();

            await dbContext.Set<TEntity>().AddAsync(entity);
            await dbContext.Set<TEntity>().AddAsync(secondEntity);
            await dbContext.SaveChangesAsync();

            List<TEntity> entities = await service.FetchAllAsync();

            TEntity entityFromDb = entities[0];
            TEntity secondEntityFromDb = entities[1];

            AssertEntitiesAreEqual(entity, entityFromDb);
            AssertEntitiesAreEqual(secondEntity, secondEntityFromDb);
        }

        [Fact]
        public async Task FetchAll_EmptyDataBase_ReturnsEmpty()
        {
            using var dbContext = new AppDbContext(Options);
            EntityService<TEntity> service = GetService(dbContext);

            List<TEntity> entities = await service.FetchAllAsync();

            Assert.Empty(entities);
        }

        [Fact]
        virtual public async Task Fetch_RetrievesOneEntity_Success()
        {
            using var dbContext = new AppDbContext(Options);
            EntityService<TEntity> service = GetService(dbContext);
            (TEntity entity, TEntity secondEntity) = GetEntities();

            await dbContext.Set<TEntity>().AddAsync(entity);
            await dbContext.Set<TEntity>().AddAsync(secondEntity);
            await dbContext.SaveChangesAsync();

            TEntity entityFromDb = await service.FetchByIdAsync(entity.Id!.Value);

            AssertEntitiesAreEqual(entity, entityFromDb);
        }

        [Fact]
        public async Task Fetch_IdNotFound_ReturnNulls()
        {
            using var dbContext = new AppDbContext(Options);
            EntityService<TEntity> service = GetService(dbContext);

            TEntity entity = await service.FetchByIdAsync(42);

            Assert.Null(entity);
        }
    }
}