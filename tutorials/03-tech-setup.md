# 3. Tech Setup

> Part 3 of the [From CV to Site](../README.md) tutorial series.

## Prerequisites

- macOS, Linux, or Windows with WSL 2 installed
- Stable internet connection
- 45 to 60 minutes
- Administrator access on your machine

## Tools you will install

| Tool | Purpose |
|---|---|
| Node.js (LTS) | JavaScript runtime that Next.js requires |
| pnpm | Package manager; faster and disk-efficient |
| Git | Version control |
| GitHub account | Remote repository hosting |
| Claude Code | Anthropic's terminal-based AI coding assistant |
| VS Code (optional) | Text editor with good Git and terminal integration |

## How the tools fit together

The tools interact as follows during a typical session:

- **Node.js** runs the build and development server for Next.js
- **pnpm** installs dependencies into `node_modules/` and records exact versions in `pnpm-lock.yaml`
- **Git** tracks changes locally and creates commit history
- **GitHub** hosts the remote repository and serves as the trigger for Vercel deployments (Tutorial 6)
- **Claude Code** reads files in your project directory and executes edits you approve
- **VS Code** provides an editor with an integrated terminal where all the above commands run

Install in the order given below. Each step includes a verification command.

## Installing Node.js

Install the latest LTS (Long Term Support) version of Node.js.

**macOS or Linux with Homebrew:**

```bash
brew install node
```

**Windows (WSL) or Linux with apt:**

Use `nvm` to manage Node versions.

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
# restart your terminal
nvm install --lts
nvm use --lts
```

**Official installer:**

Download from [nodejs.org](https://nodejs.org) and select the LTS option.

**Verification:**

```bash
node --version
# Expected: v20.x.x or higher
```

## Installing pnpm

```bash
npm install -g pnpm
```

**Verification:**

```bash
pnpm --version
# Expected: 9.x.x or higher
```

## Setting up Git

Install Git if it is not already present.

**macOS:** Git ships with the Xcode Command Line Tools. Run `git --version` to trigger installation if needed.

**Linux:**

```bash
sudo apt install git
```

**Windows:** Install Git for Windows from [git-scm.com](https://git-scm.com) or use the version bundled with WSL.

Configure your identity globally:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global init.defaultBranch main
```

**Verification:**

```bash
git --version
git config --global --list
```

## Creating a GitHub account

Sign up at [github.com](https://github.com) with the same email you used in `git config`.

Configure SSH access so you can push without entering a password each time:

```bash
ssh-keygen -t ed25519 -C "you@example.com"
# press Enter to accept defaults
cat ~/.ssh/id_ed25519.pub
```

Copy the printed public key and add it at [github.com/settings/ssh/new](https://github.com/settings/ssh/new).

**Verification:**

```bash
ssh -T git@github.com
# Expected: "Hi <username>! You've successfully authenticated..."
```

## Installing Claude Code

Claude Code is Anthropic's terminal-based AI coding assistant.

```bash
npm install -g @anthropic-ai/claude-code
```

Authenticate on first run:

```bash
claude
# follow the authentication prompt in your browser
```

Refer to the official documentation at [docs.claude.com/claude-code](https://docs.claude.com/claude-code) for the most current setup instructions.

**Verification:**

```bash
claude --version
```

## Claude Code basic commands

Once installed, the following commands are useful within a project directory.

- `claude` — start an interactive session in the current directory
- `/help` — list available slash commands within a session
- `/clear` — clear the current conversation context
- `/exit` — leave the session

Claude Code reads and writes files in the current directory based on your instructions. You approve each action before it runs, except in modes you explicitly configure otherwise.

## Installing VS Code (optional)

VS Code provides a convenient editor with built-in Git tools and an integrated terminal. Download from [code.visualstudio.com](https://code.visualstudio.com).

Recommended extensions:

- ESLint
- Prettier
- Tailwind CSS IntelliSense (for later tutorials)

## Verifying the full setup

Run each command in sequence. All should return a version string without error.

```bash
node --version
pnpm --version
git --version
claude --version
ssh -T git@github.com
```

If any command fails, see Troubleshooting below.

## Troubleshooting

**`command not found: pnpm`**

Node's global bin directory may not be in your `PATH`. Restart the terminal. If the problem persists, run `npm config get prefix` and ensure that directory's `bin` subfolder is in your shell's `PATH`.

**`Permission denied (publickey)` when running `ssh -T git@github.com`**

The SSH key was not added to GitHub or was generated with a passphrase the agent is not holding. Re-run `cat ~/.ssh/id_ed25519.pub`, paste the output into GitHub's SSH settings, then retry.

**Claude Code fails to install on Linux with `EACCES`**

Avoid `sudo` with `npm install -g`. Configure npm to install globals to your home directory instead:

```bash
mkdir -p ~/.npm-global
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH
```

Add the `export` line to your shell configuration file (`~/.zshrc` or `~/.bashrc`) to persist it.

**`git push` rejected with `error: src refspec main does not match any`**

The local branch is named differently from what the remote expects. Check the branch name with `git branch --show-current`. Push the current branch explicitly: `git push -u origin HEAD`.

**`pnpm dev` fails with `EADDRINUSE`**

Another process is using port 3000. Either stop that process (`lsof -i :3000` identifies it) or run the dev server on an alternate port: `pnpm dev -- --port 3001`.

## Directory conventions

Keep all your code projects under a single folder. A common convention on macOS and Linux is `~/dev/`:

```bash
mkdir -p ~/dev
cd ~/dev
```

Subsequent tutorials assume your Next.js project will live at `~/dev/my-site/`. Adjust paths as needed if you prefer a different location.

## Next tutorial

[Tutorial 4: Building the Pages](04-building-pages.md)

---

*Questions or feedback: open an issue on the [repository](https://github.com/HakeoungLee/from-cv-to-site) or email [hannahlee@virginia.edu](mailto:hannahlee@virginia.edu).*

[Back to README](../README.md)
