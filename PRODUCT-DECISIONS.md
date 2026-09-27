# FSCC Kiosk Architecture

## Goals
- reliable startup without waiting for network resources
- polished church presentation designed for large screens
- local-first content that can be edited without source code changes
- graceful failure when external media or services are unavailable

## Core structure
- Application shell
- content validation layer
- fallback local data
- Overview presentation engine
- slide playback engine
- settings and diagnostics layer
- optional enhancements such as calendar or media integrations

## Runtime behavior
1. Boot shell renders immediately
2. Load bundled fallback content
3. Validate content model
4. Render Overview
5. Initialize optional integrations after runtime is stable

## key decisions
- content is structured JSON
- no external dependency is required to display the first screen
- media failures do not block app startup
- slide timing, progress, and motion are shared around one timing model
