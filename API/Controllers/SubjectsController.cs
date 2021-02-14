using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class SubjectsController : BaseController
    {
        private readonly DataContext _context;

        public SubjectsController(DataContext context) =>
            _context = context;

        [HttpGet]
        public async Task<ActionResult<List<Subject>>> GetSubjects() =>
            await _context.Subjects.ToListAsync();
        [HttpGet("{id}")]
        public async Task<ActionResult<Subject>> GetSubject(Guid id) =>
            await _context.Subjects.FindAsync(id);
    }
}