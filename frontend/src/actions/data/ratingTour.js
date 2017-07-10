import { parseJSON } from '../../utils/misc';

import { 
    post_tour_rating,
} from '../../utils/http_functions';

export function postTourRating(rating, tourId, userId) {
    return (dispatch) => {
        post_tour_rating(rating, tourId, userId)
            .then(parseJSON)
            .catch(error => {
                alert('Error rating! Please try again.')
            });
    };
}