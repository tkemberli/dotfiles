# Lines configured by zsh-newuser-install
HISTFILE=~/.config/zsh/histfile
HISTSIZE=1000
SAVEHIST=1000
setopt autocd extendedglob nomatch notify
unsetopt beep
bindkey -v
# End of lines configured by zsh-newuser-install
# The following lines were added by compinstall
zstyle :compinstall filename '/home/tkemberli/.zshrc'

autoload -Uz compinit
compinit
# End of lines added by compinstall

# Start X at login
if [ -z "${DISPLAY}" ] && [ "${XDG_VTNR}" -eq 1 ]; then
  exec startx
fi

# Theming
autoload -Uz promptinit
promptinit
prompt spaceship

# Utilities
## Tab Completion
zstyle ':completion:*' menu select
zmodload zsh/complist
_comp_options+=(globdots) # include hidden files

# Vim Mode
export KEYTIMEOUT=1
## Edit line in vim 
autoload edit-command-line; zle -N edit-command-line
bindkey '^e' edit-command-line

# Change cursor shape for different vi modes.
function zle-keymap-select {
  if [[ ${KEYMAP} == vicmd ]] ||
     [[ $1 = 'block' ]]; then
    echo -ne '\e[1 q'
  elif [[ ${KEYMAP} == main ]] ||
       [[ ${KEYMAP} == viins ]] ||
       [[ ${KEYMAP} = '' ]] ||
       [[ $1 = 'beam' ]]; then
    echo -ne '\e[5 q'
  fi
}
zle -N zle-keymap-select
zle-line-init() {
    zle -K viins # initiate `vi insert` as keymap (can be removed if `bindkey -V` has been set elsewhere)
    echo -ne "\e[5 q"
}
zle -N zle-line-init
echo -ne '\e[5 q' # Use beam shape cursor on startup.
preexec() { echo -ne '\e[5 q' ;} # Use beam shape cursor for each new prompt.


export EDITOR=nvim
#export VISUAL=code

# Aliases
alias sudo='doas'
alias sudoedit='doas nvim'
alias v='nvim'
alias vi='nvim'
alias vim='nvim'
alias c='clear'
alias fm='xplr'
alias ls='exa'
alias la='exa -a'

alias xmoc="v .xmonad/xmonad.hs"
alias xmor="xmonad --recompile"
alias dt="killall dunst & dunstify testing dunst!"
alias rs="echo 50 > ~/.cache/brightness"
alias srvadm="/home/tkemberli/scripts/serverAdministration.sh"

alias dacsig="xclip -selection clipboard ~/documents/dacSignature"

# Plugins
source /usr/share/zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
source /usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh
#THIS MUST BE AT THE END OF THE FILE FOR SDKMAN TO WORK!!!
export SDKMAN_DIR="$HOME/.sdkman"
[[ -s "$HOME/.sdkman/bin/sdkman-init.sh" ]] && source "$HOME/.sdkman/bin/sdkman-init.sh"
