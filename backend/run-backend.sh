source myenv/bin/activate
cd api_server
uvicorn main:app --host 0.0.0.0 --port 8000 --reload