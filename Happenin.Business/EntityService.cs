using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Happnin.Data;

namespace SecretSanta.Business
{
    public abstract class EntityService<TEntity>: IEntityService<TEntity>
        where TEntity: EntityBase
    {
        protected AppDbContext ApplicationDbContext { get; }
        protected IMapper Mapper { get; }

        public EntityService(AppDbContext applicationDbContext, IMapper mapper)
        {
            ApplicationDbContext = applicationDbContext ?? throw new ArgumentNullException(nameof(applicationDbContext));
            Mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<bool> DeleteAsync(int id)
        {
            bool deleted = false;

            TEntity entity = await FetchByIdAsync(id);
            if (entity != null)
            {
                var entityFromDb = ApplicationDbContext.Set<TEntity>().Remove(entity);
                deleted = entityFromDb.State == EntityState.Deleted;

            }
            await ApplicationDbContext.SaveChangesAsync();
            
            return deleted;
        }

        virtual public async Task<List<TEntity>> FetchAllAsync() =>
            await ApplicationDbContext.Set<TEntity>().ToListAsync();

        virtual public async Task<TEntity> FetchByIdAsync(int id) =>
            await ApplicationDbContext.Set<TEntity>().SingleOrDefaultAsync(item => item.Id == id);

        public async Task<TEntity> InsertAsync(TEntity entity)
        {
            await InsertAsync(new [] { entity });
            return entity;
        }
        public async Task<TEntity[]> InsertAsync(params TEntity[] entities)
        {
            foreach (TEntity entity in entities)
            {
                ApplicationDbContext.Set<TEntity>().Add(entity);
                await ApplicationDbContext.SaveChangesAsync();
            }
            return entities;
        }

        public virtual async Task<TEntity> UpdateAsync(int id, TEntity entity)
        {
            TEntity result = await ApplicationDbContext.Set<TEntity>().SingleAsync(item => item.Id == id);
            Mapper.Map(entity, result);
            await ApplicationDbContext.SaveChangesAsync();
            return result;
        }
    }
}