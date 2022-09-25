import XMonad
import XMonad.Hooks.DynamicLog
import XMonad.Hooks.ManageHelpers
import XMonad.Util.EZConfig
import XMonad.Layout.NoBorders (noBorders, smartBorders)
import XMonad.Hooks.EwmhDesktops  --To be able to have fullscreen windows DEPRECATED
import XMonad.Hooks.WindowSwallowing
import XMonad.Util.NamedScratchpad
import XMonad.StackSet as W

import XMonad.ManageHook
import XMonad.Hooks.ManageHelpers (isFullscreen, doFullFloat, doCenterFloat)

import qualified Data.Map as M

myModMask = mod4Mask
myTerminal = "alacritty"
myBar = "xmobar"

myBorderWidth = 1
myFocusedBorderColor = "#80ffdb"
myNormalBorderColor = "#252525" 
myLayoutHook = smartBorders $ layoutHook def 

myWorkspaces = ["<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"/></svg>", "wrk", "web", "mus"]
myWorkspaceIndices = M.fromList $ zipWith (,) myWorkspaces [1..]

scratchpads = [
    NS "terminal" "alacritty -t terminal" (title =? "terminal") floatMiddleBig,
    NS "notes" "joplin-desktop" (title =? "Joplin") floatMiddleBig
    ]

floatMiddleBig = customFloating $ W.RationalRect (0.1) (0.1) (0.8) (0.8)
floatMiddleSmall = customFloating $ W.RationalRect (0.3) (0.3) (0.4) (0.5)

myPP = filterOutWsPP [scratchpadWorkspaceTag] xmobarPP{
    ppCurrent = xmobarColor myFocusedBorderColor "" . wrap "[" "]",
    ppTitle = xmobarColor "#fcfcfc" "" . shorten 60
}

toggleStrutsKey XConfig {XMonad.modMask = modMask} = (modMask, xK_b)

myManageHook = composeAll[
    isFullscreen --> doFullFloat,
    className =? "Pcmanfm" --> floatMiddleBig,
    title =? "Save File" --> floatMiddleSmall] <+> namedScratchpadManageHook scratchpads

myConfig = ewmhFullscreen $ ewmh $ def {
    terminal = myTerminal,
    modMask = myModMask,
    borderWidth = myBorderWidth,
    focusedBorderColor = myFocusedBorderColor,
    normalBorderColor = myNormalBorderColor,
    layoutHook = myLayoutHook,
    manageHook = myManageHook,
    XMonad.workspaces = myWorkspaces,
    handleEventHook = swallowEventHook (className =? "Alacritty") (return True)
} `additionalKeys` [    
    ((myModMask, xK_F2), spawn "~/scripts/audioControl.sh -"),
    ((myModMask, xK_F3), spawn "~/scripts/audioControl.sh +"),
    ((myModMask, xK_F4), spawn "~/scripts/audioControl.sh mute"),

    ((myModMask, xK_F5), spawn "playerctl previous"),
    ((myModMask, xK_F6), spawn "playerctl play-pause"),
    ((myModMask, xK_F7), spawn "playerctl next"),
    ((myModMask, xK_F8), spawn "playerctl stop"),
    
    ((myModMask, xK_Right), spawn "~/scripts/brightness.sh setInteractively"),
    ((myModMask, xK_Up), spawn "~/scripts/brightness.sh increase"),
    ((myModMask, xK_Down), spawn "~/scripts/brightness.sh decrease"),
    
    ((myModMask, xK_F10), spawn "brave --new-window"),
    ((myModMask, xK_F11), spawn "pcmanfm"),
    
    ((myModMask, xK_p), spawn "rofi -show drun"),
    ((myModMask, xK_o), spawn "rofi -show run"),
    ((myModMask, xK_i), spawn "rofi -show window"),
    
    ((myModMask, xK_a), namedScratchpadAction scratchpads "terminal"),
    ((myModMask, xK_s), namedScratchpadAction scratchpads "notes")]

main = xmonad =<< statusBar myBar myPP toggleStrutsKey myConfig
