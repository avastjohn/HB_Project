# put in a bunch of people and levels and user_levels


# make a main function that says if name = main, add stuff...?

import model

def load_users():
    u1 = model.User(username="pinkiepie", 
                    pettype="alligator",
                    petname="Gummy")
    u1.set_password("balloons")    
    model.session.add(u1)

    u2 = model.User(username="rainbowdash", 
                    pettype="tortoise",
                    petname="Tank")
    u2.set_password("lightning")    
    model.session.add(u2)

    u3 = model.User(username="twilightsparkle", 
                    pettype="owl",
                    petname="Owlewiscious")
    u3.set_password("stars")    
    model.session.add(u3) 

def load_levels():
    l1 = model.Level(map = "GGG apt GGG")
    model.session.add(l1)

    l2 = model.Level(map = "GGGG GptG apGG GGGG")
    model.session.add(l2)   

    l3 = model.Level(map = "GGGt GGpp GppG apGG")
    model.session.add(l3)


def main():
    model.create_tables()
    load_users()
    load_levels()
    model.session.commit()

if __name__ == "__main__":
    main()