package virtusa.vride.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import virtusa.vride.model.Pooling;
import virtusa.vride.model.Rider2;

public interface Rider2Repository extends JpaRepository<Rider2,Long>{
    public Collection<Rider2> findByPooling(Pooling pooling);
}
