@echo off
setlocal
cd /d "%~dp0.."
where flutter >nul 2>nul
if errorlevel 1 (
  echo Flutter belum terbaca. Tambahkan flutter\bin ke PATH lalu buka ulang VS Code.
  exit /b 1
)
if not exist backend\.venv\Scripts\python.exe (
  py -3 -m venv backend\.venv
  if errorlevel 1 exit /b 1
)
backend\.venv\Scripts\python.exe -m pip install -r backend\requirements.txt
if errorlevel 1 exit /b 1
if not exist backend\.env (
  copy backend\.env.example backend\.env >nul
  echo Edit backend\.env: isi DB_PASSWORD, lalu buat database snakepedia di pgAdmin.
  echo Jalankan kembali script ini setelah konfigurasi siap.
  exit /b 1
)
backend\.venv\Scripts\python.exe scripts\check_database.py
if errorlevel 1 exit /b 1
pushd backend
.venv\Scripts\python.exe -m alembic upgrade head
if errorlevel 1 exit /b 1
popd
pushd frontend
call flutter pub get
if errorlevel 1 exit /b 1
popd
echo Setup selesai. Buka dua terminal untuk scripts\run_backend.cmd dan scripts\run_frontend.cmd.
