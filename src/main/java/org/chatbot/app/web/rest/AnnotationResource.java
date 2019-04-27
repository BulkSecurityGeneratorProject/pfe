package org.chatbot.app.web.rest;

import org.chatbot.app.domain.Annotation;
import org.chatbot.app.domain.AnnotationGrouped;
import org.chatbot.app.repository.AnnotationRepository;
import org.chatbot.app.service.UserService;
import org.chatbot.app.web.rest.errors.BadRequestAlertException;
import org.chatbot.app.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Annotation.
 */
@RestController
@RequestMapping("/api")
public class AnnotationResource {

    private final Logger log = LoggerFactory.getLogger(AnnotationResource.class);

    private static final String ENTITY_NAME = "annotation";

    private final AnnotationRepository annotationRepository;
    private final UserService userService;

    public AnnotationResource(AnnotationRepository annotationRepository,UserService userService) {
        this.annotationRepository = annotationRepository;
        this.userService=userService;
    }

    /**
     * POST  /annotations : Create a new annotation.
     *
     * @param annotation the annotation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new annotation, or with status 400 (Bad Request) if the annotation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/annotations")
    public ResponseEntity<Annotation> createAnnotation(@RequestBody Annotation annotation) throws URISyntaxException {
        log.debug("REST request to save Annotation : {}", annotation);
        if (annotation.getId() != null) {
            throw new BadRequestAlertException("A new annotation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Annotation result = annotationRepository.save(annotation);
        return ResponseEntity.created(new URI("/api/annotations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /annotations : Updates an existing annotation.
     *
     * @param annotation the annotation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated annotation,
     * or with status 400 (Bad Request) if the annotation is not valid,
     * or with status 500 (Internal Server Error) if the annotation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/annotations")
    public ResponseEntity<Annotation> updateAnnotation(@RequestBody Annotation annotation) throws URISyntaxException {
        log.debug("REST request to update Annotation : {}", annotation);
        if (annotation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Annotation result = annotationRepository.save(annotation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, annotation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /annotations : get all the annotations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of annotations in body
     */
    @GetMapping("/annotations")
    public List<Annotation> getAllAnnotations() {
        log.debug("REST request to get all Annotations");
        Long id=userService.getUserWithAuthorities().get().getId();
        return annotationRepository.findByUserId(id);
    } 

    @GetMapping("/annotationGrouped")
    public List<?> getGrupedAnnotations(){
        Long id=userService.getUserWithAuthorities().get().getId();
        return annotationRepository.findGroupAnnotaion(id);
    }
    /**
     * GET  /annotations/:id : get the "id" annotation.
     *
     * @param id the id of the annotation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the annotation, or with status 404 (Not Found)
     */
    @GetMapping("/annotations/{id}")
    public ResponseEntity<Annotation> getAnnotation(@PathVariable Long id) {
        log.debug("REST request to get Annotation : {}", id);
        Optional<Annotation> annotation = annotationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(annotation);
    }

    /**
     * DELETE  /annotations/:id : delete the "id" annotation.
     *
     * @param id the id of the annotation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/annotations/{id}")
    public ResponseEntity<Void> deleteAnnotation(@PathVariable Long id) {
        log.debug("REST request to delete Annotation : {}", id);
        annotationRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
