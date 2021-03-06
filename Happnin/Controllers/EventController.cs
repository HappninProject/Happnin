﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Happnin.Business.Dto;
using Happnin.Business.Services;
using Microsoft.AspNetCore.Mvc;

namespace Happnin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : BaseController<Event, EventInput>
    {
        public EventController(IEventService service) : base(service)
        {
        }

        [HttpGet]
        [Route("HostedEvent/{id}")]
        public Task<List<Event>> GetHostedEvents(string id)
        {
            var eventService = (IEventService)this.Service;
            return eventService.FetchHostedEventsAsync(id);
        }

        [HttpGet]
        [Route("EventsOnly/")]
        public Task<List<Event>> GetEventsOnly()
        {
            var eventService = (IEventService) this.Service;
            return eventService.FetchEventsOnlyAsync();
        }

        [HttpGet]
        [Route("Products/")]
        public Task<List<Event>> GetProducts()
        {
            var eventService = (IEventService) this.Service;
            return eventService.FetchProductEventsAsync();
        }
    }
}