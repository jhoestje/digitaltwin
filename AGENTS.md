# AI Agents

This repository includes a set of reusable AI coding agent personas in the `.agents/` directory. They are IDE-agnostic and work with any AI assistant that reads markdown instruction files (Cursor, Copilot, Windsurf, Cline, Aider, etc.).

## Available Agents

| Agent | File | Purpose |
|-------|------|---------|
| **Code Planner** | [code-planner.md](.agents/code-planner.md) | Architect and plan features, modules, and system design |
| **API Designer** | [api-designer.md](.agents/api-designer.md) | Design, document, and standardize RESTful APIs |
| **Database Architect** | [database-architect.md](.agents/database-architect.md) | Design schemas, write migrations, and optimize queries |
| **Test Engineer** | [test-engineer.md](.agents/test-engineer.md) | Write and maintain unit, integration, and end-to-end tests |
| **Code Reviewer** | [code-reviewer.md](.agents/code-reviewer.md) | Review code for quality, style, and potential bugs |
| **Debugger** | [debugger.md](.agents/debugger.md) | Systematically diagnose and fix bugs |
| **Refactoring Specialist** | [refactoring-specialist.md](.agents/refactoring-specialist.md) | Improve code structure without changing behavior |
| **Security Auditor** | [security-auditor.md](.agents/security-auditor.md) | Analyze code for security vulnerabilities |
| **Performance Profiler** | [performance-profiler.md](.agents/performance-profiler.md) | Analyze, benchmark, and optimize performance |
| **DevOps Engineer** | [devops-engineer.md](.agents/devops-engineer.md) | Manage builds, containers, CI/CD, and deployment |
| **Documentation Writer** | [documentation-writer.md](.agents/documentation-writer.md) | Create and maintain project documentation |
| **Feature Orchestrator** | [feature-orchestrator.md](.agents/feature-orchestrator.md) | End-to-end workflow coordinating all agents |

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
