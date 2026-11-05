@echo off
cd /d "%~dp0..\backend"
if not exist .venv\Scripts\python.exe (
  echo Jalankan scripts\setup_windows.cmd dulu.
  exit /b 1
)
.venv\Scripts\python.exe ..\scripts\check_database.py
if errorlevel 1 exit /b 1
.venv\Scripts\python.exe -m alembic upgrade head
if errorlevel 1 exit /b 1
.venv\Scripts\python.exe -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
