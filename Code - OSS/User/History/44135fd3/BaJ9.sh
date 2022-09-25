#!/bin/bash

#Usage
#   "increase" to increase brightness
#   "decrease" to decrease brightness
#   "set [VALUE]" to set brightness to a certain value
#   "setInteractively" to get a prompt asking for which value to set

dunstTag="brightness"
featureCode=10
persistenceFile=~/.cache/brightness
incrementValue=10

function increase(){
    if (($(getCurrentBrightness) < 100))
    then
        newValue=$(($(getCurrentBrightness) + $incrementValue))
        set $newValue
    fi
}

function decrease() {
    if (($(getCurrentBrightness) > 0))
    then
        newValue=$(($(getCurrentBrightness) - $incrementValue))
        set $newValue
    fi
}

function set() {
    valueToSet=$1
    if (($valueToSet > 100))
    then
        $valueToSet = 100
    fi

    if (($valueToSet < 0))
    then
        $valueToSet = 0
    fi 

    ddcutil setvcp $featureCode $valueToSet
    persistValue $valueToSet
}

function setInteractively(){
    value=$(rofi -dmenu -p "Brightness")

    re='^[0-9]+$'
    if [[ $value =~ $re ]] ; then
        set $value    
    fi
}


function persistValue(){
    
    re='^[0-9]+$'
    if [[ $1 =~ $re ]] ; then
       echo $1 > $persistenceFile   
    else
        echo 50 > $persistenceFile
    fi
}

function getCurrentBrightness(){
    value=$(cat $persistenceFile)

    re='^[0-9]+$'
    if [[ $value =~ $re ]] ; then
       echo $value   
    else
        echo 50
    fi
}

case $1 in
    "increase")
        $(increase)
    ;;

    "decrease")
        $(decrease)
    ;;

    "set")
        $(set $2)
    ;;

    "setInteractively")
        $(setInteractively)
    ;;
esac

dunstify -u low -h string:x-dunst-stack-tag:$dunstTag -i display $(getCurrentBrightness)