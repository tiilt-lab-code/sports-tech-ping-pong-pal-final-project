input.onButtonPressed(Button.A, function () {
    basic.showIcon(IconNames.Yes)
    basic.pause(500)
    basic.clearScreen()
    running = 1
})
input.onButtonPressed(Button.B, function () {
    running = 0
    basic.showIcon(IconNames.No)
    basic.pause(500)
    basic.clearScreen()
})
let trigger = 0
let roll = 0
let prev_roll = 0
let pitch = 0
let prev_pitch = 0
let running = 0
running = 0
while (true) {
    basic.pause(100)
    if (!(running)) {
        continue;
    }
    prev_pitch = pitch
    prev_roll = roll
    pitch = input.rotation(Rotation.Pitch) - input.acceleration(Dimension.Y) * 0.0389
    roll = input.rotation(Rotation.Roll) - input.acceleration(Dimension.X) * 0.0387
    if (pitch <= -30 && prev_pitch <= -30) {
        basic.showLeds(`
            . . # . .
            . . # . .
            # . # . #
            . # # # .
            . . # . .
            `)
        music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
        trigger = 1
    }
    if (pitch >= 15 && prev_pitch >= 15) {
        basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
        music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
        trigger = 1
    }
    if (roll <= -30 && prev_roll <= -30) {
        basic.showLeds(`
            . . # . .
            . . . # .
            # # # # #
            . . . # .
            . . # . .
            `)
        music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
        trigger = 2
    }
    if (roll >= 30 && prev_roll >= 30) {
        basic.showLeds(`
            . . # . .
            . # . . .
            # # # # #
            . # . . .
            . . # . .
            `)
        music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
        trigger = 2
    }
    datalogger.log(
    datalogger.createCV("roll (compensated)", roll),
    datalogger.createCV("pitch (compensated)", pitch),
    datalogger.createCV("accel x", input.acceleration(Dimension.X)),
    datalogger.createCV("accel y", input.acceleration(Dimension.Y)),
    datalogger.createCV("trigger", trigger)
    )
    trigger = 0
    basic.clearScreen()
}
