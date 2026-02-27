# AI Agents

This repository includes a set of reusable AI coding agent personas in the `.agents/` directory. They are IDE-agnostic and work with any AI assistant that reads markdown instruction files (Cursor, Copilot, Windsurf, Cline, Aider, etc.).

## Dev environment tips
follow @console-agents.md

## Available Agents
Follow the instructions in each agent file to use them according to what is needed for the change you are making.
| Agent | File | Purpose |
|-------|------|---------|
| **API Designer** | @api-designer.md | Design, document, and standardize RESTful APIs |
| **Code Planner** | @code-planner.md | Architect and plan features, modules, and system design |
| **Code Reviewer** | @code-reviewer.md | Review code for quality, style, and potential bugs |
| **Database Architect** | @database-architect.md | Design schemas, write migrations, and optimize queries |
| **Debugger** | @debugger.md | Systematically diagnose and fix bugs |
| **DevOps Engineer** | @devops-engineer.md | Manage builds, containers, CI/CD, and deployment |
| **Documentation Writer** | @documentation-writer.md | Create and maintain project documentation |
| **Feature Orchestrator** | @feature-orchestrator.md | End-to-end workflow coordinating all agents |
| **Performance Profiler** | @performance-profiler.md | Analyze, benchmark, and optimize performance |
| **Refactoring Specialist** | @refactoring-specialist.md | Improve code structure without changing behavior |
| **Security Auditor** | @security-auditor.md | Analyze code for security vulnerabilities |
| **Test Engineer** | @test-engineer.md | Write and maintain unit, integration, and end-to-end tests |

## Usage

Copy the contents of any agent file into your AI assistant's system prompt or context, or reference the file directly if your IDE supports it.

**Examples:**
- **Cursor**: Add as a `.cursorrules` file or reference in chat
- **Copilot**: Reference in `.github/copilot-instructions.md`
- **Windsurf**: Reference in `.windsurf/rules/` or `.windsurf/workflows/`
- **Cline**: Add to custom instructions
- **Aider**: Pass via `--read` flag

## Customization

Each agent auto-detects the project stack by reading your codebase (build files, config, source structure). No hardcoded project-specific values — they work on any repository.
