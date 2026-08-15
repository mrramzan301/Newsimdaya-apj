from fastapi import FastAPI, HTTPException
import requests

app = FastAPI()

@app.get("/api/search")
def search_sim_data(query: str):
    """
    Query mein Number (03xxxxxxxxx) ya CNIC daalein
    """
    url = "https://paksim.xyz/psg-search.php"
    headers = {
        "accept": "*/*",
        "content-type": "application/x-www-form-urlencoded",
        "origin": "https://paksim.xyz",
        "referer": "https://paksim.xyz/",
        "user-agent": "Mozilla/5.0",
        "x-requested-with": "XMLHttpRequest"
    }
    payload = f"q={query}"

    try:
        response = requests.post(url, headers=headers, data=payload, timeout=10)
        return {"status": "success", "data": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
