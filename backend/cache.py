import json
import asyncio

filename = 'cache.json'
cache_lock = asyncio.Lock()


async def get_json():
    await asyncio.sleep(2)

    # load the cache save in cache.json
    async with cache_lock:
        with open(filename, 'r', encoding='utf-8') as json_file:
            cache = json.load(json_file)

    return cache


async def save_json(cache_json):
    await asyncio.sleep(2)

    async with cache_lock:
        # save the cache in cache.json
        with open('cache.json', 'w', encoding='utf-8') as json_file:
            json.dump(cache_json, json_file, ensure_ascii=False, indent=2)
