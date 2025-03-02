Set-ExecutionPolicy Unrestricted -Scope Process
y
.\myenv\Scripts\Activate.ps1
uvicorn main:app --host 0.0.0.0 --port 8000 --reload