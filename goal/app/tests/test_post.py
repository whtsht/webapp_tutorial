from db_models import db, Post
from main import create_app
import pytest


@pytest.fixture(scope="session")
def app():
    app = create_app()
    app.app_context().push()

    yield app

    db.drop_all()


# 1テスト毎に実行
@pytest.fixture(scope="function", autouse=True)
def session():
    yield db

    # テーブル内のデータを全て削除
    db.session.query(Post).delete()
    db.session.commit()


@pytest.fixture()
def client(app):
    return app.test_client()


def test_index(client):
    response = client.get("/web/")
    assert b"React" in response.data


def test_add_post(client):
    response = client.post("/web/add/", json={"title": "夕食", "content": "カレーだった"})
    assert b"OK" in response.data

    posts = db.session.query(Post).all()
    assert len(posts) == 1
    assert posts[0].content == "カレーだった"


def test_delete_post(client):
    response = client.post("/web/add/", json={"title": "夕食", "content": "カレーだった"})
    assert b"OK" in response.data

    response = client.post("/web/delete/", json={"title": "夕食"})
    assert b"OK" in response.data

    posts = db.session.query(Post).all()
    assert len(posts) == 0


def test_get_posts(client):
    response = client.post("/web/add/", json={"title": "夕食", "content": "カレーだった"})
    assert b"OK" in response.data

    response = client.post("/web/add/", json={"title": "今日", "content": "特に何もなかった"})
    assert b"OK" in response.data

    response = client.get("/web/get/")
    assert response.json[0]["title"] == "夕食"
    assert response.json[1]["title"] == "今日"
