<script>
import { createDesktopRoute } from '../routing/utils';
export default {
  middleware({ redirect } ) {
    return redirect(createDesktopRoute('general'));
  }
};
</script>
