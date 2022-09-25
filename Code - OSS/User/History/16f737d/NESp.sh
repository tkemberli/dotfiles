#!/bin/bash

# TODO: DRY

#Usage
#   "mute" to mute audio
#   "+" to increase volume
#   "-" to decrease volume
#   ex.: ~/scripts/audioControl.sh +

dunstTag="audio"
incrementValue=1

function modify(){
    wpctl set-volume @DEFAULT_AUDIO_SINK@ $incrementValue%$1
    $(notify)
}

function getCurrentVolume() {
    wpctl get-volume @DEFAULT_AUDIO_SINK@ | awk {'print $2'}
}


function mute(){
    wpctl set-mute @DEFAULT_AUDIO_SINK@ toggle
}


function toggleMute(){
    isOn=$(isMuted)

    if [[ "$isOn" == "true" ]]
    then
        mute
        $(notify)
    else
        mute
        $(notify true)
    fi
}


function isMuted(){
    isOn=$(wpctl get-volume @DEFAULT_AUDIO_SINK@ | awk {'print $3'})

    if [[ "$isOn" == "[MUTED]" ]]
    then 
        echo "true"
        

    else
        echo "false"
    fi
}


function notify(){
    if [[ "$1" == "true" ]]
    then
        dunstify -u low -h string:x-dunst-stack-tag:$dunstTag -i emblem-unavailable "MUTED"   
    else
        dunstify -u low -h string:x-dunst-stack-tag:$dunstTag -i audio-headset $(getCurrentVolume)
    fi
}


case $1 in 
    "mute")
        $(toggleMute)
    ;;

    *)
        $(modify $1)
    ;;
esac
