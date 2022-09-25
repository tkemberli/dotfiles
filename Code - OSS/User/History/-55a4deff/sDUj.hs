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

myWorkspaces = ["\xf121", "\xf0b1", "\xf2d0", "\xf001"]
myWorkspaceIndices = M.fromList $ zipWith (,) myWorkspaces [1..]

scratchpads = [
    NS "terminal" "alacritty -t terminal" (title =? "terminal") floatMiddleBig,
    NS "notes" "joplin-desktop" (title =? "Joplin") floatMiddleBig
    ]

floatMiddleBig = customFloating $ W.RationalRect (0.1) (0.1) (0.8) (0.8)
floatMiddleSmall = customFloating $ W.RationalRect (0.3) (0.3) (0.4) (0.5)
floatLeftSmall = customFloating $ W.RationalRect (0) (0.02) (0.4) (0.5)
floatRightSmall = customFloating $ W.RationalRect (0) (0.02) (0.4) (0.5)

myPP = filterOutWsPP [scratchpadWorkspaceTag] xmobarPP{
    ppCurrent = xmobarColor myFocusedBorderColor "" . wrap "[" "]",
    ppTitle = xmobarColor "#fcfcfc" "" . shorten 60
}

toggleStrutsKey XConfig {XMonad.modMask = modMask} = (modMask, xK_b)

myManageHook = composeAll[
    isFullscreen --> doFullFloat,
    className =? "Pcmanfm" --> floatMiddleBig,
    title =? "Save File" --> floatMiddleSmall,
    title =? "System Monitor" --> floatLeftSmall,
    title =? "Calendar" --> floatRightSmall] <+> namedScratchpadManageHook scratchpads

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
