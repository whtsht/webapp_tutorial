from db_models import db, Post


def add_post(title: str, content: str):
    post = Post(title, content)
    db.session.add(post)
    db.session.commit()


def delete_post(title: str):
    post = db.session.query(Post).filter(Post.title == title).first()
    db.session.delete(post)
    db.session.commit()


def get_posts() -> list[Post]:
    posts = db.session.query(Post).all()
    return posts
