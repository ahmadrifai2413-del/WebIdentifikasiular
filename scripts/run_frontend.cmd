@echo off
cd /d "%~dp0..\frontend"
call flutter run -d chrome --web-port=5174 --dart-define=API_BASE_URL=http://localhost:8000
