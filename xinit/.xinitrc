#!/bin/sh

userresources=$HOME/.Xresources
usermodmap=$HOME/.Xmodmap
sysresources=/etc/X11/xinit/.Xresources
sysmodmap=/etc/X11/xinit/.Xmodmap

# merge in defaults and keymaps

if [ -f $sysresources ]; then
    xrdb -merge $sysresources
fi


if [ -f $sysmodmap ]; then
    xmodmap $sysmodmap
fi


if [ -f "$userresources" ]; then
    xrdb -merge "$userresources"
fi


if [ -f "$usermodmap" ]; then
    xmodmap "$usermodmap"
fi


# start some nice programs

if [ -d /etc/X11/xinit/xinitrc.d ] ; then
 for f in /etc/X11/xinit/xinitrc.d/?*.sh ; do
  [ -x "$f" ] && . "$f"
 done
 unset f
fi

export GTK_THEME=Adwaita:dark

ddcutil getvcp 10 | awk '{print $9}' | sed 's/,//g' > ~/.cache/brightness

setxkbmap -layout br -variant abnt2
# amixer sset Master 75%
numlockx &
feh --bg-center --randomize ~/Dropbox/Wallpapers* &
redshift -l $LOCATION &
xsetroot -cursor_name left_ptr
xset r rate 300 50
picom --experimental-backend &
dunst &
exec xmonad
