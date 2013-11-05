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

def load_user_levels():
    # pinkie does levels 1 and 2
    u_l1 = model.UserLevel(user_id=1, 
                        level_id=1,
                        current_level_input="rr",
                        complete=1)
    model.session.add(u_l1)

    u_l2 = model.UserLevel(user_id=1, 
                        level_id=2,
                        current_level_input="ru",
                        complete=0)
    model.session.add(u_l2)

    # twilight does three levels
    u_l3 = model.UserLevel(user_id=3, 
                        level_id=1,
                        current_level_input="rr",
                        complete=1)
    model.session.add(u_l3)

    u_l4 = model.UserLevel(user_id=3, 
                        level_id=2,
                        current_level_input="rur",
                        complete=1)
    model.session.add(u_l4)

    u_l5 = model.UserLevel(user_id=3, 
                        level_id=3,
                        current_level_input="ruR",
                        complete=1)
    model.session.add(u_l5)


def main():
    model.create_tables()
    load_users()
    load_levels()
    load_user_levels()
    model.session.commit()

if __name__ == "__main__":
    main()