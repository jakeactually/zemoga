export const TitleIcon = ({ isPositive }: { isPositive: boolean }) => {
    if (isPositive) {
        return <div
            className={`icon-button title-icon`}
            aria-label="thumbs up">
            <img src="assets/img/thumbs-up-1.svg" alt="thumbs up" />
        </div>;
    }
    return <div
        className={`icon-button title-icon`}
        aria-label="thumbs down">
        <img src="assets/img/thumbs-down.svg" alt="thumbs up" />
    </div>;
}
